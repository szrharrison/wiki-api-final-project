class Api::V1::DatasetsController < ApplicationController
  before_action :set_page_and_dataset
  before_action :authorize_account!

  # GET api/v1/pages/*relative_path/dataset
  def show
    render json: @dataset
  end

  # PATCH api/v1/pages/*relative_path/dataset
  def update
    @dataset.as_json.keys.each do |field|
      if (!dataset_params.keys.include?(field)) && field != '_id'
        @dataset.remove_attribute(field)
      end
    end
    @dataset.update_attributes( dataset_params )
    if @dataset.save
      render json: @dataset
    else
      render json: { error: @dataset.errors.full_messages }
    end
  end

  private

  def set_page_and_dataset
    @page = Page.find_by(relative_path: params[:relative_path])
    @dataset = @page.dataset
  end

  def dataset_params
    params.require(:dataset).permit!
  end
end
