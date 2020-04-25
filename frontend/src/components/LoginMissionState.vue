<template>
  <div
    class="w3-container w3-mobile w3-theme-d2 m-statement-container"
    id="m-statement-section"
  >
    <div class="w3-container m-state-content-section">
      <div class="w3-container w3-padding w3-mobile w3-half ms-img-section">
        <img
          class="w3-image w3-round-xlarge ms-img"
          src="https://i.pinimg.com/originals/cc/d7/9c/ccd79c05fbea21187de20a0c70d91d50.jpg"
        />
      </div>

      <div class="w3-container w3-half w3-mobile m-statement-section">
        <div
          class="w3-mobile w3-padding w3-round-xlarge w3-animate-opacity cust-display-text2"
        >
          <!--<h1>Our Commitment</h1>-->
          <h1>For Buffalo and Beyond <font-awesome-icon icon="heart" /></h1>
          <br />
          <p>
            The 2010s has withness an explosion and celebration of people's
            identities. We have seen victories, setbacks, and awareness spread
            across all diverse groups of people. While these unified us, lack of
            knowlegde, exposure, and common sense oftentimes separate us.<br />
            <br />
            To better unify people, team Bonnies developed <b>identity.SN</b> to
            provide an anoynymous social network platform for people of Buffalo
            and beyond to have more meaningful conversations about potentially
            divisive topics and make long-lasting connections.
            <br />
            <br />
            With that in mind, we encourage you to have an open mindset and
            respect for your match. We are committed to
            <b>spread love and not hate</b> so hateful or discriminatory
            behaviors are not tolerated. We hope you enjoy what
            <b>identity.SN</b> has to offer!

            <br />
            <br />
            With love, Team Bonnies
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faHeart);
export default {
  name: "LoginMissionState",
  components: {
    FontAwesomeIcon,
  },
};
</script>
