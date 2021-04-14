class PatchesChannel < ApplicationCable::Channel
  def subscribed
    # stream_or_reject_for Patch.find(params[:id])
    stream_from "patches"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
