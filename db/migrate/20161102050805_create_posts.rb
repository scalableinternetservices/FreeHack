class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|
      t.text :content
      t.references :user, foreign_key: true
      t.integer :repost_id
      t.integer :original_id

      t.timestamps
    end
    add_index :posts, [:user_id, :created_at]
  end
end
