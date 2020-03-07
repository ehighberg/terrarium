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

      @model = get_model_sym.new(model_params)
      puts "model params"
      puts model_params
      puts "created model"
      puts @model
      @model.experiment_id = @experiment.id

      if @model.save
        render json: {experiment: @experiment, model: @model}, status: :created, location: @experiment
      else
        render json: @model.errors, status: :unprocessable_entity
      end

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
    @model = get_model_sym.find(model_params[:experiment_id])
  end

  def get_model_sym
    model_types = {
      :linear_regression => LinearRegression
    }
    model_types[@experiment.model.to_sym]
  end

  def start_params
    params.permit(:time_start, :target, :metric, :user_id, :model, :dataset)
  end

  def end_params
    params.permit(:time_end, :final_score, :history)
  end

  def model_params
    puts "params"
    puts params
    puts params.permit(:model_info)
    params.permit(:model_info)
  end
end
