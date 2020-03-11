class Experiment < ApplicationRecord
  belongs_to :user
  has_one :linear_regression, :dependent => :destroy

  accepts_nested_attributes_for :linear_regression
end
