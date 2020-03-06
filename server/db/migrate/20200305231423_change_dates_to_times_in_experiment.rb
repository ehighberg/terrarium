class ChangeDatesToTimesInExperiment < ActiveRecord::Migration[6.0]
  def change
    change_column :experiments, :time_start, :timestamp
    change_column :experiments, :time_end, :timestamp
  end
end
