# Wrapper for JotForms REST API.
# JotForm (jotform.com) is a 3rd party form / survey provider we're using for certain forms.
# API docs: https://api.jotform.com/docs/
module Pd
  module JotForm
    class JotFormRestClient
      API_ENDPOINT = 'http://api.jotform.com/'.freeze

      def initialize
        @api_key = get_config_value :api_key

        @resource = RestClient::Resource.new(
          API_ENDPOINT,
          headers: {
            content_type: :json,
            accept: :json
          }
        )
      end

      # Get a list of all questions on a form
      # See https://api.jotform.com/docs/#form-id-questions
      def get_questions(form_id)
        get "/form/#{form_id}/questions"
      end

      def get_submissions(form_id, last_known_submission_id: nil)
        params = {
          orderby: 'id asc'
        }
        if last_known_submission_id
          params[:filter] = {
            'id:gt' => last_known_submission_id.to_s
          }.to_json
        end

        get "form/#{form_id}/submissions", params
      end

      private

      # Makes a GET call to the specified path
      # @param path [String]
      # @param params [Hash] url params
      # @return [Hash] parsed JSON response body, on success
      # @raises [RestClient::ExceptionWithResponse] on known error codes.
      # See https://github.com/rest-client/rest-client#exceptions-see-httpwwww3orgprotocolsrfc2616rfc2616-sec10html
      # Note the supplied params will be merged with default_params
      def get(path, params = {})
        path_with_params = "#{path}?#{default_params.merge(params).to_query}"
        response = @resource[path_with_params].get
        JSON.parse response.body
      end

      def default_params
        {
          apiKey: @api_key
        }
      end

      def get_config_value(key)
        raise KeyError, "Unable to find JotForm setting: #{key}" unless CDO.jotform_api.try(:key?, key.to_s)
        CDO.jotform_api[key.to_s]
      end
    end
  end
end
