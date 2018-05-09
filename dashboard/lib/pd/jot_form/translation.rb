module Pd
  module JotForm
    class Translation
      include Constants

      def initialize(form_id)
        @form_id = form_id
        @client = JotFormRestClient.new
      end

      # Retrieves question data from JotForm and translates it into a data format our models can ingest
      # @return [Array<Hash>] reformatted questions:
      #   [
      #     {
      #       form_id:
      #       question_id:
      #       question_type: See VALID_QUESTION_TYPES
      #       question_name: "unique" (not enforced by JotForm) name per form
      #       question_text:
      #       order: 1-based order the question appears in the form
      #       details: Only for some question types. See below
      #     }
      #   ]
      #   Details are present for the following question types:
      #   - dropdown
      #       {
      #         options: [Array<String>]
      #       }
      #   - radio, checkbox
      #       {
      #         options: [Array<String>]
      #         allow_other: [Boolean]
      #       }
      #   - scale
      #       {
      #         from_value: [Integer] low value of the scale
      #         to_value: [Integer] high value of the scale
      #         from_text: [String] text at the low end of the scale
      #         to_text: [String] text at the high end of the scale
      #       }
      #   - matrix
      #       {
      #         columns: [Array<String>] Column headers
      #         rows: [Array<String>] Row text
      #         values: [Array<Array<Integer>>] (optional) numeric values left to right, top to bottom.
      #                                         Otherwise we assume 1,2,3... for each row, in order.
      #       }
      def get_questions
        response = @client.get_questions(@form_id)
        # Content is a hash of question id => question details
        # The question details also contain the id, so we can simply inspect the values
        response['content'].values.map {|q| parse_jotform_question(q)}.compact
      end

      def get_submissions(last_known_submission_id: nil)
        response = @client.get_submissions(@form_id, last_known_submission_id: last_known_submission_id)
        response['content'].map {|s| parse_jotform_submission(s)}
      end

      protected

      def parse_jotform_question(jotform_question)
        id = jotform_question['qid']
        type = jotform_question['type'].delete_prefix('control_')
        return nil if SKIP_QUESTION_TYPES.include? type
        raise "Unexpected question type #{type} for id #{id}" unless VALID_QUESTION_TYPES.include? type

        name = jotform_question['name']
        text = jotform_question['text']
        order = jotform_question['order']

        details =
          case type
          when 'dropdown'
            {
              options: jotform_question['options'].split('|')
            }
          when 'checkbox', 'radio'
            {
              options: jotform_question['options'].split('|'),
              allow_other: jotform_question['allowOther'] == 'Yes'
            }
          when 'scale'
            {
              from_value: jotform_question['scaleFrom'],
              to_value: jotform_question['scaleAmount'],
              from_text: jotform_question['fromText'],
              to_text: jotform_question['toText']
            }
          when 'matrix'
            {
              columns: jotform_question['mcolumns'].split('|'),
              rows: jotform_question['mrows'].split('|'),

              # Optional numeric values. Otherwise we'll assume left to right 1,2,3...
              values: jotform_question['calcMatrixValues'].split('|').map{|row| row.split(',')}
            }
          else
            nil
          end

        {
          form_id: @form_id,
          question_id: id,
          question_type: type,
          question_name: name,
          question_text: text,
          order: order,
          details: details
        }
      end

      def parse_jotform_submission(jotform_submission)
        id = jotform_submission['id']

        # Answer json is in the form:
        #   question id => {name, text, type, answer, ...}
        # All we need is the question id key and answer value
        answers = jotform_submission['answers'].transform_values {|a| a['answer']}

        {
          form_id: @form_id,
          submission_id: id,
          answers: answers
        }
      end
    end
  end
end
