<template>
	<q-layout view="hHh LpR fFf">
		<q-page-container class="">
			<q-page class="row items-center justify-evenly">
				<q-card class="my-card q-pa-none q-ma-none shadow-24"
						style="width: 40%; height: 50%">
					<q-form @submit.prevent="signIn" greedy>
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
									<q-btn color="primary" type="submit" label="Sign In" no-caps/>
								</q-card-section>
							</q-col>
						</q-row>
					</q-form>
				</q-card>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {IUser} from "src/interfaces/IUser";
import * as Realm from 'realm-web'
import {Loading} from "quasar";


@Component
export default class NewUser extends Vue {
	user: IUser = {
		email: 'pranhinmiad30@gmail.com',
		password: '20212021'
	}

	created() {
		console.log(this.$realm.currentUser)
	}

	signIn() {
		Loading.show()
		let credentials = Realm.Credentials.emailPassword(this.user.email, this.user.password)
		this.$realm.logIn(credentials).then(user => {
			//this.$realm.currentUser.profile.type = UserType.ADMIN

			open('/admin', "_self")

		}).finally(() => {
			Loading.hide()
		})
	}
}
</script>

<style lang=scss>
</style>
