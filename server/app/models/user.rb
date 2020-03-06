class User < ApplicationRecord
  has_many :experiment
  has_many :linear_regression, :through => :experiment
end
