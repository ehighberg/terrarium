class ExperimentController < ApplicationController
  before_action :set_experiment, only: [:show, :update, :destroy]
  before_action :authorize_request, except: [:index, :show]
  before_action :set_model, only: [:show, :update, :destroy]


  def index
    @experiments = Experiment.all
    render json: @experiments
  end

  def show
    render json: {experiment: @experiment, model: @model}
  end

  def create
    @experiment = Experiment.new(start_params)

    if @experiment.save
      set_model
      render json: { experiment: @experiment, model: @model }, status: :created, location: @experiment
    else
      render json: @experiment.errors, status: :unprocessable_entity
    end
  end

  def update
    if @experiment.update(end_params)
      render json: @experiment
    else
      render json: @experiment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @model.destroy
    @experiment.destroy
  end

  private

  def set_experiment
    @experiment = Experiment.find(params[:id])
  end

  def set_model
    @model = get_model_sym.find_by(experiment_id: @experiment.id)
  end

  def get_model_sym
    model_types = {
      :linear_regression => LinearRegression
    }
    model_types[@experiment.model.to_sym]
  end

  def start_params
    passed_params = params.require(:experiment)
      .permit(:time_start, :target, :metric, :user_id, :model, :dataset)

    model_accessor = "#{passed_params[:model]}_attributes"
    passed_params[model_accessor] = params.require(:model_info).permit!
    passed_params
  end

  def end_params
    params.require(:experiment).permit(:time_end, :final_score, :history)
  end

end
