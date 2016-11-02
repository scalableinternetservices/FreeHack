class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User
  
  validates :name, length: {maximum: 50} # , presence: true
  validates :email, presence: true, length: {maximum: 256}
  
  has_many :posts
  has_many :follows
end
