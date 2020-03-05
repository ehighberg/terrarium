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
  password_digest: 'bob',
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
  history: history.to_json
  })

linear_regression = LinearRegression.create({
  experiment_id: experiment.id,
  standard_scale: false,
  learning_rate: 0.1,
  max_iterations: 5
})
