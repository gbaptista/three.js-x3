# frozen_string_literal: true

task :build do
  system('yarn build-dev')
  # system('yarn build-prod')
end

task :release do
  system('yarn build-prod')

  system('npm pack')

  puts "Done!\n\n"
  puts 'yarn remove three-x3; yarn cache clean; yarn add --force ../three.js-x3/three-x3-0.0.1.tgz'
  puts "\n\n"
end
