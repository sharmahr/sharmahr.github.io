import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import { ArrowBack, ArrowOut } from "../components/icons.jsx";
import { listParent, listChild, VIEWPORT } from "../lib/motion.js";

function Metric({ number, label, children }) {
  return (
    <motion.div className="metric" variants={listChild}>
      <span className="metric__n">{children || number}</span>
      <span className="metric__l">{label}</span>
    </motion.div>
  );
}

export default function SmartParking() {
  return (
    <>
      <Seo
        title="Park It — Hardik Sharma"
        description="Park It: a camera-based parking availability system using Mask R-CNN to detect vacant bays, with an Android booking app. Smart India Hackathon 2019 finalist."
        path="/work/smart-parking"
      />

      <main id="main" className="wrap">
        <Reveal className="pagehead">
          <Link className="back mono" to="/#work">
            <ArrowBack />
            Selected work
          </Link>
          <h1>Park It</h1>
          <p className="lead mt-xl">
            A camera-based system that works out which parking bays are genuinely empty,
            and lets a driver reserve one before setting off. Built with a team of five;
            it took us to the Smart India Hackathon 2019 finals.
          </p>
        </Reveal>

        <motion.div
          className="metrics gap-b-l"
          data-reveal
          variants={listParent(0.055, 0.03)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <Metric number="Top 4" label="of 314 teams at Smart India Hackathon 2019" />
          <Metric label="Mean average precision after transfer learning">
            70<em>%</em>
          </Metric>
          <Metric number="5" label="Engineers on the team, which I led" />
          <Metric number="3" label="Backend APIs serving the Android client" />
        </motion.div>

        <Reveal as="section" className="rail band">
          <p className="mono muted">The problem</p>
          <div className="prose">
            <p>
              India is the world&apos;s fourth-largest automotive market and its parking capacity has
              not kept pace. A meaningful share of urban congestion is just people circling,
              looking for a space. The information already exists — the lot owner can see their
              own lot — it simply never reaches the driver.
            </p>
            <p>
              Existing solutions mostly fall into two camps, and both have a catch. Ultrasonic
              sensor grids need continuous maintenance and cannot tell a car from a pedestrian
              crossing the receptive field. Cell-based vision systems assume the lot is painted
              into discrete, known bays — which most real lots, especially informal outdoor ones,
              are not.
            </p>
            <p>
              We wanted something with no per-bay hardware, no maintenance burden, and no
              assumption that the lot is neatly demarcated.
            </p>
            <img
              src="/assets/projects/parkit/starting.png"
              alt="Park It concept overview showing drivers, parking lots and the mobile application"
            />
          </div>
        </Reveal>

        <Reveal as="section" className="rail band">
          <p className="mono muted">Approach</p>
          <div className="prose">
            <p>
              The lot owner installs an ordinary camera and draws a region of interest around
              their parking area, then sets a capacity. No painted cells required — the ROI can
              be any polygon they like.
            </p>
            <img
              src="/assets/projects/parkit/roi.png"
              alt="Tool for drawing a region-of-interest polygon around a parking area"
            />
            <p>
              Frames from that camera go to the server, which runs Mask R-CNN to detect and
              localise cars. A lot is considered to have space only when the number of cars found
              inside the ROI is below the owner&apos;s stated capacity. Because we count vehicles
              rather than probe fixed slots, the same approach works indoors and outdoors.
            </p>

            <h2>Availability, accounting for drivers already on their way</h2>
            <p>
              Detection alone overcounts availability: a driver who has booked but not yet
              arrived occupies a space the camera cannot see. So availability is computed as:
            </p>
            <p className="mono mono--sent pullquote">
              available = capacity − cars detected − outstanding bookings
            </p>
            <p>
              The server searches lots within 200&nbsp;m of the driver first, using the Google
              Distance Matrix API, and requests fresh frames from those candidates. If nothing is
              free it widens the radius to 400&nbsp;m and repeats.
            </p>
            <img
              src="/assets/projects/parkit/server1.png"
              alt="Server flow diagram for the nearby parking areas API"
            />
          </div>
        </Reveal>

        <Reveal as="section" className="rail band">
          <p className="mono muted">The model</p>
          <div className="prose">
            <p>
              Mask R-CNN extends Faster R-CNN with a branch that predicts a segmentation mask for
              each region of interest, in parallel with the existing classification and
              bounding-box regression heads. We used the masks and boxes to locate cars in frame.
            </p>
            <img src="/assets/projects/parkit/rcnn.png" alt="Mask R-CNN architecture diagram" />
            <p>
              Rather than train from scratch we applied transfer learning to a pre-trained
              network, annotating our own parking imagery with the VGG Image Annotator. That took
              mean average precision past 70% on our data — enough to be useful, and a reminder
              that the annotation effort, not the architecture, was the real cost.
            </p>
            <img
              src="/assets/projects/parkit/train.png"
              alt="Annotated training image showing labelled cars in a parking lot"
            />
          </div>
        </Reveal>

        <Reveal as="section" className="rail band">
          <p className="mono muted">The product</p>
          <div className="prose">
            <p>
              Drivers register once through Firebase Authentication, then enter where they want
              to park. The app fires a request carrying their coordinates and a user key; the
              response comes back as JSON, is parsed with Volley and cached locally so progress
              survives the app being backgrounded. Navigation to the chosen lot is drawn as a
              polyline route using the Google Directions API.
            </p>
            <img
              src="/assets/projects/parkit/app.png"
              alt="Three Android screens: registration, login and the main booking page"
            />
            <p>
              On arrival the lot owner scans the driver&apos;s ID, which fires the verification API and
              decrements the outstanding-bookings counter. Cancellation does the same in reverse,
              releasing the held space immediately.
            </p>
            <img
              src="/assets/projects/parkit/server2.png"
              alt="Server flow diagram for verifying a booking on arrival"
            />
            <img
              src="/assets/projects/parkit/server3.png"
              alt="Server flow diagram for cancelling a booking"
            />
          </div>
        </Reveal>

        <Reveal as="section" className="rail band band--close">
          <p className="mono muted">Stack</p>
          <div>
            <div className="tags mt-0">
              <span className="tag">Mask R-CNN</span><span className="tag">TensorFlow</span><span className="tag">Keras</span>
              <span className="tag">Django</span><span className="tag">Python</span><span className="tag">Android</span>
              <span className="tag">Firebase Auth</span><span className="tag">Firebase Realtime DB</span>
              <span className="tag">Google Maps / Places / Directions</span><span className="tag">Distance Matrix API</span>
              <span className="tag">Volley</span>
            </div>
            <p className="muted note-sm">
              Django server with a TensorFlow inference path; Android client using Firebase for
              auth and realtime state. Three APIs: nearby parking areas, booking cancellation and
              user verification.
            </p>
          </div>
        </Reveal>

        <Reveal className="rail band band--open">
          <p className="mono muted">Next</p>
          <p>
            <Link className="arrowlink lnk" to="/archive">
              See the rest of the archive
              <ArrowOut />
            </Link>
          </p>
        </Reveal>
      </main>
    </>
  );
}
