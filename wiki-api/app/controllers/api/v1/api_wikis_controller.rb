class Api::V1::ApiWikisController < ApplicationController
  before_action :set_api_wiki, only: [:show, :update]
  before_action :authorize_account!
  def index
    render json: current_account.api_wikis
  end

  def show
    render json: @api_wiki
  end

  private

  def set_api_wiki
    @api_wiki = ApiWiki.find_by(slug: params[:slug])
  end
end
