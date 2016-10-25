class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User
  
  validates :name, presence: true, length: {maximum: 50}
  validates :email, presence: true, length: {maximum: 256}
end
