class PatchesController < ApplicationController
  def index
  end

  def show
    @patch ||= Patch.find(params[:id])
  end

  def create
  end

  def destroy
  end

  private

  def patch_params
    params.require(:id).permit(:name, :author)
  end
end
