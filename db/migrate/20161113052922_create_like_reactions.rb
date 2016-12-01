class CreateLikeReactions < ActiveRecord::Migration[5.0]
  def change
    create_table :like_reactions do |t|
      t.references :post, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
    # add_index :like_reactions, [:post_id, :user_id]
    # add_index :like_reactions, :user_id
    # add_index :like_reactions, :post_id
  end
end
