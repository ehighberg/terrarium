# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'json'

user = User.create({
  username: 'ehighberg',
  email: 'errol@errol.errol',
  password: 'bob',
  role: 'admin',
  name: 'Errol Highberg'
  })

history = {
  loss: [99, 77.2, 33, 11, 8],
  r2: [0.1, 0.33, 0.57, 0.7, 0.743]
}

experiment = Experiment.create({
  user_id: user.id,
  time_start: Time.new,
  time_end: Time.new + 30,
  target: 'net_energy',
  metric: 'r2',
  final_score: 0.9,
  history: history.to_json,
  model: 'linear_regression',
  dataset: 'ccpp'
  })

linear_regression = LinearRegression.create({
  experiment_id: experiment.id,
  standard_scale: false,
  learning_rate: 0.1,
  max_iterations: 5
})


def make_users(num_users)
  users = User.create((0...num_users).map do |_|
    {
      username: Faker::Internet.username,
      email: Faker::Internet.email,
      password: Faker::Alphanumeric.alpha(number: 8),
      role: 'user',
      name: Faker::Name.name
    }
  end)
  return users
end


def make_histories(num_histories, length)
  (0...num_histories).map do |_|
    {
      loss: (0...length).map { |_| Faker::Number.within(range: 1..100) },
      r2: (0...length).map { |_| Faker::Number.decimal(l_digits: 0, r_digits: 2) }
    }
  end
end

def make_experiments(users, histories)
  experiments = Experiment.create(users.map.with_index do |user, i|
    {
      user_id: user.id,
      time_start: Time.new + i * 60,
      time_end: Time.new + i * 60 + 30,
      target: 'net_energy',
      metric: 'r2',
      final_score: histories[i][:r2].last,
      history: histories[i].to_json,
      model: 'linear_regression',
      dataset: 'ccpp'
    }
  end)
  return experiments
end

def make_linear_regressions(experiments, history_length)
  LinearRegression.create(experiments.map do |experiment|
    {
      experiment_id: experiment.id,
      standard_scale: Faker::Boolean.boolean,
      learning_rate: Faker::Number.decimal(l_digits: 0, r_digits: 2),
      max_iterations: history_length
    }
  end)
end

num_new_users = 5
history_length = 10

users = make_users(num_new_users)
histories = make_histories(num_new_users, history_length)
experiments = make_experiments(users, histories)
make_linear_regressions(experiments, history_length)
