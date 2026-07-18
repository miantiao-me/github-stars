---
project: recorder
stars: 519
description: |-
    📹 Record is an open-source web app to record screen and camera directly in your browser | No installation required | No tracking | Fully local
url: https://github.com/addyosmani/recorder
---

# 🎥 Record

Record [record.addy.ie](https://record.addy.ie) is an open-source web app lets you record your screen and camera directly in your browser – privacy-friendly with no downloads or installations required! Record from a tab, window or your full screen.

<a align="center" href="https://record.addy.ie">
  <img alt="" src="public/screenshot-02.jpg" width="49%"/>
  <img alt="" src="public/screenshot-03.jpg" width="49%"/>
</a>

## Features

- ✨ **Simple and Intuitive:** Record offers a user-friendly interface, making recording a breeze for everyone.
- 🎥 **Screen and Camera Recording:** Capture your browser tab or window while simultaneously adding a personal touch with your webcam.
- 🖼️ **Picture-in-Picture View:** Experience the magic of picture-in-picture, see yourself while you're recording your screen.
- 🔄 **Customizable Camera Shape:** Choose between a circular or square camera view that persists in both preview and final recording.
- 📝 **Built-in Teleprompter:** Use the integrated teleprompter to read your script while recording, with adjustable speed and playback controls.
- 🔒 **Local and Secure:** Privacy should always be a top priority! All recordings take place directly in your browser so whatever you record, only you'll have access to it.
- 🎬 **Real-time Preview:** Preview your camera and screen recording in real-time before diving into the action.
- 🔄 **MP4 Conversion:** Convert your recordings from WEBM to MP4 format using FFMPEG.wasm, right in your browser!

## How to Use

1. **Access the Web Application:** Fire up your browser and head to [record.addy.ie](https://record.addy.ie).

2. **Choose Your Mode:** Select your desired recording mode:

   - 🖥️ **Screen only:** Capture your browser tab or window without the camera.
   - 🎥 **Screen and camera:** Record your browser tab or window along with your awesome camera.
   - 📷 **Camera only:** Focus solely on your camera for a personal touch.

3. **Customize Camera Shape:** Select your preferred camera shape (square or circle) using the shape toggle in the footer.

4. **Use the Teleprompter (Optional):** 
   - Click the teleprompter icon in the footer to open the teleprompter
   - Type or paste your script into the text area
   - Use the playback controls to start/pause scrolling
   - Adjust the scroll speed using the + and - buttons
   - Close the teleprompter when you're done

5. **Start Recording:** Click the big red "Record" button to kickstart your screen and camera recording adventure.

6. **Picture-in-Picture View:** Your camera will appear in a nifty picture-in-picture view while recording the screen.

7. **Save and Convert:** When you're done, click the "Stop" button and choose to either:
   - Download directly as WEBM
   - Convert to MP4 using FFMPEG.wasm before downloading

## Browser Compatibility

Record currently only works with Chrome and Chromium browsers. It leverages certain browser capabilities that may not be available in other browsers at the moment.

## Support

If you encounter any issues, have questions, or need assistance, please feel free to [open an issue](https://github.com/addyosmani/recorder/issues) on GitHub. We welcome your feedback and are happy to assist with any questions or concerns you may have.

## Development & Contributions

Excited to dive into the code and make this app even cooler? To get started, follow these steps:

1. **Clone the Repository:** Fork the Record repository and clone it to your local machine using Git.

   ```bash
   git clone https://github.com/addyosmani/recorder.git
   ```

2. **Navigate to the Directory:** Move into the Record project directory.

   ```bash
   cd recorder
   ```

3. **Install Dependencies:** Install the necessary dependencies using Yarn.

   ```bash
   yarn
   ```

4. **Run the Development Server:** Start the development server with Yarn.

   ```bash
   yarn dev
   ```

5. **Make Your Changes:** Work your magic! Make the desired improvements, add features, or fix issues.

6. **Create a Pull Request:** Once you're happy with your changes, create a pull request on the main Record repository. We'll review your contribution and merge it if everything looks good!

## Credits

This project is a fork of the original [Recorder](https://github.com/contrastio/recorder) by [Contrast](https://getcontrast.io). This fork adds a number of features across camera layout, teleprompting, MP4 conversion and others.

## License

Recorder is released under the [MIT License](LICENSE), allowing you to freely use, modify, and distribute the application.

<br/>

---

<br/>

Time to unleash your creativity and capture those moments with Recorder! 🎬🌟 Lights, camera, action!

