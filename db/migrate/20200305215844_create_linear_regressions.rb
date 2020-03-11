class CreateLinearRegressions < ActiveRecord::Migration[6.0]
  def change
    create_table :linear_regressions do |t|
      t.boolean :standard_scale
      t.float :learning_rate
      t.integer :max_iterations
      t.references :experiment, null: false, foreign_key: true

      t.timestamps
    end
  end
end
