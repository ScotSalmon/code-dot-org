module Pd
  module JotFormBackedQuestion
    extend ActiveSupport::Concern

    class_methods do
      def sync_from_jotform(form_id)
        JotForm::Translation.new(form_id).get_questions.each do |question|
          find_or_initialize_by(question.slice(:form_id, :question_id)).update!(
            question.slice(
              :question_type,
              :question_name,
              :question_text,
              :order,
              :details
            )
          )
        end
      end
    end
  end
end
