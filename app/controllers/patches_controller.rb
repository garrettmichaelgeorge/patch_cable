class PatchesController < ApplicationController
  def index
    @patches ||= Patch.includes(boxes: [:inlets, :outlets]).all
  end

  def show
    @patch ||= Patch.find(params[:id])

    if @stimulus_reflex
      render layout: false
    end
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
