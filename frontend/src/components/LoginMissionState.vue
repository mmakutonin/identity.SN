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
            The 2010s has allowed people to explore deeper and expand their
            identities. We've witnessed equality, same-sex marriage, and a
            multitude of cultural celebrations. However, lack of knowlegde,
            exposure, and common sense oftentimes separate us. There are bias
            incidents everywhere and the only way to fix this is through honest
            conversations. <br />
            <br />
            As an effort to spread education and awareness of others'
            identities, team Bonnies developed identiy.sn to provide an
            anoynymous platform for people of Buffalo and beyond to have more
            exposure to many different identities through open and respectful
            conversations.
            <br />
            <br />
            With that in mind, identity.sn is only suitable for those who are
            ready and willing to discuss abstract concepts and identities.
            <br />
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
