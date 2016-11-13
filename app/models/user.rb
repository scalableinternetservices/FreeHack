class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User
  
  validates :name, length: {maximum: 50} # , presence: true
  validates :email, presence: true, length: {maximum: 256}
  
  #validates_uniqueness_of :name
  
  has_many :posts, :dependent => :delete_all
end
