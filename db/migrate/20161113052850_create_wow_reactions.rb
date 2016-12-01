class CreateWowReactions < ActiveRecord::Migration[5.0]
  def change
    create_table :wow_reactions do |t|
      t.references :post, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
    # add_index :wow_reactions, [:post_id, :user_id]
    # add_index :wow_reactions, :user_id
    # add_index :wow_reactions, :post_id
  end
end
