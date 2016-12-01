class CreateChannels < ActiveRecord::Migration[5.0]
  def change
    create_table :channels do |t|
      t.references :post, foreign_key: true
      t.string :name

      t.timestamps
    end
    # add_index :channels, [:name, :post_id]
    # add_index :channels, :post_id
    # add_index :channels, :name
  end
end
