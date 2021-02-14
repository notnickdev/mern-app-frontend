import "./ChannelContent.css";

export default function ChannelContent({
  deleteChannel,
  id,
  subscribers,
  channelName,
  email,
}) {
  return (
    <div
      className="channel-content-container"
      onClick={() => {
        deleteChannel(id);
      }}
    >
      <h1>Channels:</h1>
      <div className="container">
        <h4>Channel: {channelName}</h4>
        <h4>Email: {email}</h4>
        <div className="subscribers-container">
          <h4>Subscribers:</h4>
          {subscribers.map((subscriber) => (
            <p>{subscriber}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
