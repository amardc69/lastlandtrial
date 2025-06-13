import { FaTwitter, FaInstagram, FaYoutube, FaFacebook, FaPinterest, FaLinkedin, FaTiktok, FaReddit } from "react-icons/fa";

export const TIME_OF_INTEGRATION_LIMIT = { min: 10, max: 120, default: 30 };
export const platforms = [
    {
      name: "Youtube",
      icon: <FaYoutube className="w-5 h-5 text-red-600" />,
      logo: <FaYoutube className="w-6 h-6 text-red-600" />,
      content: [
        {
          type: "Shorts",
          basePrice: 60000,
          description:
            "YouTube Shorts are short-form videos perfect for quick engagement.",
        },
        {
          type: "Video",
          basePrice: 150000,
          description:
            "YouTube Videos offer comprehensive content for your audience.",
        },
        {
          type: "Community Posts",
          basePrice: 60000,
          description: "Engage your audience with YouTube Community Posts.",
        },
        {
          type: "Live",
          basePrice: 250000,
          description:
            "YouTube Live enables real-time interaction with viewers.",
          disabled: true,
        },
      ],
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="w-5 h-5 text-pink-500" />,
      logo: <FaInstagram className="w-6 h-6 text-pink-500" />,
      content: [
        {
          type: "Story",
          basePrice: 20000,
          description:
            "Instagram Stories are ephemeral posts that engage your audience daily.",
        },
        {
          type: "Reel",
          basePrice: 50000,
          description:
            "Instagram Reels are short, entertaining videos to reach a wider audience.",
        },
        {
          type: "Post",
          basePrice: 30000,
          description:
            "Instagram Posts are permanent content for showcasing your brand.",
          disabled: true,
        },
      ],
    },
    {
      name: "Twitter",
      icon: <FaTwitter className="w-5 h-5 text-blue-500" />,
      logo: <FaTwitter className="w-6 h-6 text-blue-500" />,
      content: [
        {
          type: "Tweet",
          basePrice: 15000,
          description:
            "Tweets are concise messages to engage with your followers.",
        },
        {
          type: "Video",
          basePrice: 40000,
          description:
            "Twitter Videos enhance your tweets with multimedia content.",
        },
        {
          type: "Space",
          basePrice: 100000,
          description:
            "Twitter Spaces are live audio conversations with your audience.",
        },
        {
          type: "Thread",
          basePrice: 69000,
          description:
            "Twitter Threads let you share extended thoughts across multiple tweets.",
        },
      ],
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="w-5 h-5 text-blue-800" />,
      logo: <FaLinkedin className="w-6 h-6 text-blue-800" />,
      content: [
        {
          type: "Post",
          basePrice: 30000,
          description:
            "LinkedIn Posts help you share professional updates and insights.",
        },
        {
          type: "Video",
          basePrice: 70000,
          description:
            "LinkedIn Videos engage your professional network with rich content.",
        },
        {
          type: "Live",
          basePrice: 150000,
          description:
            "LinkedIn Live broadcasts allow real-time professional interactions.",
        },
      ],
    },
    {
      name: "Facebook",
      icon: <FaFacebook className="w-5 h-5 text-blue-600" />,
      logo: <FaFacebook className="w-6 h-6 text-blue-600" />,
      content: [
        {
          type: "Story",
          basePrice: 25000,
          description:
            "Facebook Stories offer temporary content to engage your audience.",
        },
        {
          type: "Reel",
          basePrice: 60000,
          description:
            "Facebook Reels are short videos designed for high engagement.",
        },
        {
          type: "Post",
          basePrice: 35000,
          description:
            "Facebook Posts are versatile content pieces for your page.",
        },
        {
          type: "Live",
          basePrice: 120000,
          description:
            "Facebook Live streams enable real-time interaction with viewers.",
          disabled: true,
        },
      ],
    },
    {
      name: "Pinterest",
      icon: <FaPinterest className="w-5 h-5 text-red-600" />,
      logo: <FaPinterest className="w-6 h-6 text-red-600" />,
      content: [
        {
          type: "Pin",
          basePrice: 20000,
          description:
            "Pinterest Pins are visual bookmarks to inspire your audience.",
        },
        {
          type: "Video Pin",
          basePrice: 50000,
          description:
            "Video Pins add motion and engagement to your Pinterest strategy.",
        },
        {
          type: "Story Pin",
          basePrice: 40000,
          description:
            "Story Pins allow for multi-page storytelling on Pinterest.",
        },
        {
          type: "Idea Pin",
          basePrice: 70000,
          description:
            "Idea Pins showcase creative ideas and projects to your followers.",
        },
      ],
    },
    {
      name: "TikTok",
      icon: <FaTiktok className="w-5 h-5 text-black" />,
      logo: <FaTiktok className="w-6 h-6 text-black" />,
      content: [
        {
          type: "Short Video",
          basePrice: 40000,
          description: "TikTok short videos for quick engagement.",
        },
        {
          type: "Live",
          basePrice: 80000,
          description:
            "TikTok live streaming for real-time audience interaction.",
        },
      ],
    },
    {
      name: "Reddit",
      icon: <FaReddit className="w-5 h-5 text-orange-500" />,
      logo: <FaReddit className="w-6 h-6 text-orange-500" />,
      content: [
        {
          type: "Post",
          basePrice: 20000,
          description: "Reddit Post to engage with niche communities.",
        },
        {
          type: "AMA",
          basePrice: 50000,
          description:
            "AMA sessions to connect with the Reddit community in real time.",
        },
      ],
    }
  ];