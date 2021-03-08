# frozen_string_literal: true

ignore /dist/, /.*test.js$/

guard 'rake', task: 'build', first_match: true do
  watch(/.js$/)
end
