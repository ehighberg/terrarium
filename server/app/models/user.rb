class User < ApplicationRecord
  has_secure_password
  validates :password, length: { minimum: 8 }
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }

  has_many :experiment
  has_many :linear_regression, :through => :experiment
end
