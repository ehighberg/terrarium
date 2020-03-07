class Experiment < ApplicationRecord
  belongs_to :user
  has_one :linear_regression

  accepts_nested_attributes_for :linear_regression
end
