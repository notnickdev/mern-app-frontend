import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// Components
import Channel from "./components/Channel";
import Subscriber from "./components/Subscriber";
import Button from "./components/Button";

require('dotenv').config();

export default function App() {
  const [loading, setLoading] = useState(false);
  const [channelsData, setChannelsData] = useState([]);
  const [subscribersData, setSubscribersData] = useState([]);
  const [show, setShow] = useState(false);

  // Channel Methods
  const fetchChannels = async () => {
    const channels = await axios.get(process.env.CHANNELS_URL);
    setChannelsData([...channels.data]);
  };

  const updateChannel = async (id) => {};

  const deleteChannel = async (id) => {
    await axios.delete(`${process.env.CHANNELS_URL}${id}`);
    setChannelsData(
      channelsData.filter((newChannelData) => newChannelData._id !== id)
    );
  };

  // Subscriber Methods
  const fetchSubscribers = async () => {
    const subscribers = await axios.get(process.env.SUBSCRIBERS_URL);
    setSubscribersData([...subscribers.data]);
  };

  const updateSubscriber = async (id) => {};

  const deleteSubscriber = async (id) => {
    // await axios.delete(`${process.env.SUBSCRIBERS_URL}${id}`);
    setSubscribersData(
      subscribersData.filter(
        (newSubscriberData) => newSubscriberData._id !== id
      )
    );
  };

  useEffect(() => {
    fetchChannels();
    fetchSubscribers();
  }, []);

  if (show) {
    return (
      <div className="App">
        <Channel
          loading={loading}
          channels={channelsData}
          updateChannel={updateChannel}
          deleteChannel={deleteChannel}
        />
        <Subscriber
          loading={loading}
          subscribers={subscribersData}
          updateSubscriber={updateSubscriber}
          deleteSubscriber={deleteSubscriber}
        />
      </div>
    );
  } else {
    return <Button state={show} show={setShow} />;
  }
}
