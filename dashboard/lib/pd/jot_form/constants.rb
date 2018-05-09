module Pd
  module JotForm
    module Constants
      # supported question types
      VALID_QUESTION_TYPES = [
        'head', #header
        'textbox',
        'textarea',
        'radio',
        'dropdown',
        'checkbox',
        'matrix',
        'scale'
      ]

      SKIP_QUESTION_TYPES = [
        'button' # submit button
      ]
    end
  end
end
