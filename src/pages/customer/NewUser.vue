<template>
	<q-page class="row items-center justify-evenly">
		<q-card class="my-card items-center q-pa-none q-ma-none shadow-24"
				style="width: 40%; height: 50%">
			<q-form @submit.prevent="saveUser" greedy>
				<q-row>
					<q-col style="margin-top: 5%">
						<q-card-section>
							<q-input input-class="#4c4c4c" square v-model="user.email" color="white"
									 placeholder="User Name" :rules="[$common.rules.required]"
									 dense type="email">
							</q-input>
						</q-card-section>
						<q-card-section>
							<q-input input-class="#4c4c4c" square v-model="user.password" color="white"
									 placeholder="Password" type="password" :rules="[$common.rules.required]"
									 dense>
							</q-input>
						</q-card-section>
						<q-card-section align="right">
							<q-btn color="primary" type="submit" label="Add User" no-caps/>
						</q-card-section>
					</q-col>
				</q-row>
			</q-form>
		</q-card>
	</q-page>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {IUser} from "src/interfaces/IUser";
import {Loading} from "quasar";

@Component
export default class NewUser extends Vue {
	user: IUser = {
		email: 'pranhinmiad30@gmail.com',
		password: '20212021'
	}

	saveUser() {
		Loading.show()
		this.$realm.emailPasswordAuth.registerUser(this.user.email, this.user.password).then(value => {
			console.log(value)
		}).finally(() => {
			Loading.hide()
		})
	}
}
</script>

<style lang=scss>
</style>
