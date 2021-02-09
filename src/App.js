import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const SubsText = (props) => {
  const subscribersContainerStyles = {
    border: "1px solid black",
    width: "350px",
    marginBottom: "15px",
    marginTop: "10px",
  };

  return (
    <div
      style={subscribersContainerStyles}
      onClick={() => {
        props.deleteContainer(props.id);
      }}
    >
      <h3>Name: {props.name}</h3>
      <h3>Subbed to: {props.subscribedToChannel}</h3>
      <h3>Date: {props.subscribeDate}</h3>
    </div>
  );
};

const ErrorComponent = () => {
  return (
    <section style={{marginRight: '15px'}}>
      <p>Something went wrong please try later</p>
    </section>
  );
};

const ChannelText = (props) => {
  const channelContainerStyles = {
    border: "1px solid black",
    width: "350px",
    marginBottom: "15px",
    marginTop: "10px",
    marginRight: "25px",
  };

  const subscribersContainerBoxStyles = {
    border: "1px solid black",
    width: "200px",
    margin: "0 auto",
    marginBottom: "10px",
  };

  return (
    <div
      style={channelContainerStyles}
      onClick={() => {
        props.deleteContainer(props.id);
      }}
    >
      <h3>Channel name: {props.channelName}</h3>
      <h3>Email: {props.email}</h3>
      <h4>Subscribers:</h4>
      {props.subscribers.map((sub) => {
        return (
          <div style={subscribersContainerBoxStyles}>
            <p>{sub}</p>
          </div>
        );
      })}
    </div>
  );
};

const Channels = ({ channels, fetchChannels, deleteContainer }) => {
  console.log(`Channels: ${channels}`);
  if (channels) {
    return (
      <div>
        <h1>Channels</h1>
        <form action="POST"></form>
        <button onClick={fetchChannels}>Get Channels</button>
        {channels.map((channel) => {
          return (
            <ChannelText
              deleteContainer={deleteContainer}
              key={channel._id}
              id={channel._id}
              channelName={channel.channelName}
              email={channel.email}
              subscribers={channel.subscribers}
            />
          );
        })}
      </div>
    );
  } else {
    return <ErrorComponent />;
  }
};

const Subscribers = ({ subs, fetchSubscribers, deleteContainer }) => {
  console.log(`Subs: ${subs}`);
  if (subs) {
    return (
      <div>
        <h1>Subscribers</h1>
        <form action="POST"></form>
        <button onClick={fetchSubscribers}>Get Subscribers</button>
        {subs.map((subscriber) => {
          return (
            <SubsText
              deleteContainer={deleteContainer}
              id={subscriber._id}
              key={subscriber._id}
              name={subscriber.name}
              subscribedToChannel={subscriber.subscribedToChannel}
              subscribeDate={subscriber.subscribeDate}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <ErrorComponent />
      </div>
    );
  }
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const [subsData, setSubsData] = useState("http://localhost:3000/subscribers");
  const [channelsData, setChannelsData] = useState(
    "http://localhost:3000/channels"
  );

  const fetchChannels = async () => {
    const channelsDataResponse = await axios.get(channelsData);
    setChannelsData(channelsDataResponse);
  };

  const fetchSubscribers = async () => {
    const subscribersDataResponse = await axios.get(subsData);
    setSubsData(subscribersDataResponse);
  };

  // Fix this bug later
  const deleteChannelBoxContainer = async (id) => {
    const deleteChannel = channelsData.data.filter((channels) => {
      return channels._id !== id;
    });  

    console.log(deleteChannel);

    await axios.delete(`http://localhost:3000/channels/${id}`);

    console.log(deleteChannel);

    setChannelsData(deleteChannel);
    console.log(deleteChannel);
    console.log(id);
  };

  const deleteSubscriberBoxContainer = async (id) => {
    console.log("subscriber box deleted");
    await axios.delete(`http://localhost:3000/subscribers/${id}`);
    console.log(id);
  };

  useEffect(() => {
    fetchChannels();
    fetchSubscribers();
  }, []);

  const buttonStyles = {
    padding: "15px",
    marginTop: "20px",
    width: "300px",
    display: "flex",
    margin: "auto",
  };

  if (show) {
    return (
      <div
        className="App"
        style={{ display: "flex", margin: "0", position: "relative" }}
      >
        <Channels
          channels={channelsData.data}
          fetchChannels={fetchChannels}
          deleteContainer={deleteChannelBoxContainer}
        />
        <Subscribers
          subs={subsData.data}
          fetchSubscribers={fetchSubscribers}
          deleteContainer={deleteSubscriberBoxContainer}
        />
        <button
          style={buttonStyles}
          onClick={() => {
            setShow(!show);
          }}
        >
          Show
        </button>
      </div>
    );
  }

  return (
    <button
      style={buttonStyles}
      onClick={() => {
        setShow(!show);
      }}
    >
      Show
    </button>
  );
};

export default App;
