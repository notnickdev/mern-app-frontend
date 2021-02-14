import ChannelContent from "./ChannelContent";

export default function Channel({
  loading,
  channels,
  updateChannel,
  deleteChannel,
}) {
  console.log(channels)
  return (
    <div className="channel-container">
      {channels.map((channel) => {
        return (
          <ChannelContent
            deleteChannel={deleteChannel}
            key={channel._id}
            subscribers={channel.subscribers}
            id={channel._id}
            channelName={channel.channelName}
            email={channel.email}
          />
        );
      })}
    </div>
  );
}
