class Experiment < ApplicationRecord
  belongs_to :user
  has_one :linear_regression
end
