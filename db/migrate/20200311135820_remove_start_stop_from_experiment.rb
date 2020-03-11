class RemoveStartStopFromExperiment < ActiveRecord::Migration[6.0]
  def change
    remove_column :experiments, :time_start
    remove_column :experiments, :time_end
  end
end
