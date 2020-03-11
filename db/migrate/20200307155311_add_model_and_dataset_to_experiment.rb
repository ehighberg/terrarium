class AddModelAndDatasetToExperiment < ActiveRecord::Migration[6.0]
  def change
    add_column :experiments, :model, :string
    add_column :experiments, :dataset, :string
  end
end
