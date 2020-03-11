class CreateExperiments < ActiveRecord::Migration[6.0]
  def change
    create_table :experiments do |t|
      t.date :time_start
      t.date :time_end
      t.string :target
      t.string :metric
      t.float :final_score
      t.json :history
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
