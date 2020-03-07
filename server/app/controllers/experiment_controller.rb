class ExperimentController < ApplicationController
  before_action, :set_user, only: [:create, :destroy]
  before_action, :set_experiment, only: [:destroy]
  before_action, :authorize_request, except: [:index, :show]

  def index
    @experiments = Experiment.all
    render json: @experiments
  end

  def show
    render json: @experiment
  end

  def create
    @experiment = Experiment.new(experiment_params)

    if @experiment.save
      render json: @experiment, status: :created, location: @experiment
    else
      render json: @experiment.errors, status: :unprocessable_entity
    end
  end

  def update
    if @experiment.update(experiment_params)
      render json: @experiment
    else
      render json: @experiment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @experiment.destroy
  end

  private

  def set_experiment
    @experiment = Experiment.find(params[:id])
  end

  def experiment_params
    params.permit(:time_start, :time_end, :target, :metric, :final_score, :history, :user_id)
  end

  def model_params
    params.permit(:model_type, :model_params)
  end
end
