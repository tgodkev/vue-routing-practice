<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  inject: ['users', 'teams'],
  components: {
    UserItem
  },
  data() {
    return{
      teamName: '',
      members: [],

    };
  },
  created() {
    // setting the router id based on specific teams id.
    //this.$route.path
    const teamId = this.$route.params.teamId
    const selectedtTeam  = this.teams.find(team => team.id === teamId)
    this.teamName = selectedtTeam.name;
    const members = selectedtTeam.members;
    for(const member in members){
      const selectedUser = this.users.find(user => user.id === members[member]);
      this.members.push(selectedUser);
    }

    }

  };
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
