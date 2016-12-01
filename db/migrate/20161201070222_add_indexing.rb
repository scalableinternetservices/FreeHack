class AddIndexing < ActiveRecord::Migration[5.0]
  def change
    # users
    add_index :users, :email
    add_index :users, [:uid, :provider],     :unique => true
    add_index :users, :reset_password_token, :unique => true
    # posts
    add_index :posts, [:user_id, :created_at]
    # add_index :posts, :user_id
    # follows
    add_index :follows, :follower_id
    add_index :follows, :followed_id
    add_index :follows, [:follower_id, :followed_id, :created_at]
    # channels
    add_index :channels, [:name, :post_id]
    # add_index :channels, :post_id
    add_index :channels, :name
    # wows
    add_index :wow_reactions, [:post_id, :user_id]
    # add_index :wow_reactions, :user_id
    # add_index :wow_reactions, :post_id
    # likes
    add_index :like_reactions, [:post_id, :user_id]
    # add_index :like_reactions, :user_id
    # add_index :like_reactions, :post_id
  end
end
