// All of the static data are subject to
// future modification, e.x to be retrieved from the server
const layout = {
    active_frame: "",
    transition: 0,
    transition_list: ["", "fade-"],
    navbar: {
      options: [
        {
          name: "home",
          text: "Home",
          action: "openLink",
          value: "",
          target: ""
        },
        {
          name: "github",
          text: "GitHub",
          action: "openLink",
          value: "https://github.com/VasilisKalaitzis/react-quiz-test",
          target: "_blank"
        }
      ]
    }
  };
  
  export default layout;
  