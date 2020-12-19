<template>
	<q-page padding>
		<q-row class="justify-center">
			<q-col class="col-md-8">
				<q-card class="shadow">
					<q-form greedy @submit.prevent="save">
						<q-card-section>
							<q-input v-model="user.firstName" label="First Name" type="text" :rules="[$common.rules.required]"/>
							<q-input v-model="user.lastName" label="Last Name" type="text" :rules="[$common.rules.required]"/>
							<q-input v-model="user.email" label="Email" type="email" :rules="[$common.rules.required]"/>
							<q-input v-model="user.password" label="Password" type="password" :rules="[$common.rules.required]"/>
							<q-input v-model="user.address" label="Address" type="text" :rules="[$common.rules.required]"/>
							<q-input v-model="user.contact" label="Contact No" type="text" :rules="[$common.rules.required]"/>
						</q-card-section>
						<q-card-actions align="right">
							<q-btn type="submit" label="Sign Up" no-caps/>
						</q-card-actions>
					</q-form>
				</q-card>
			</q-col>
		</q-row>
	</q-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {INewUser} from "src/interfaces/INewUser";
import {Loading} from "quasar";
import {Collections, UserType} from "src/interfaces/util";
import * as Realm from "realm-web";

@Component({})
export default class SignUp extends Vue {

	user: INewUser = {
		firstName: '',
		lastName: '',
		contact: '',
		address: '',
		email: '',
		password: '',
		userID: '',
		userType: UserType.CUSTOMER
	}

	save() {
		Loading.show()
		this.$realm.emailPasswordAuth.registerUser(this.user.email, this.user.password).then(value => {
			let credentials = Realm.Credentials.emailPassword(this.user.email, this.user.password)
			this.$realm.logIn(credentials).then(user => {
				this.user.userID = user.id;
				this.user.password = undefined
				this.$db.collection(Collections.USERS).insertOne(this.user).then(value => {
					this.$q.notify({
						message: 'Signup success!',
						type: 'positive'
					})
					this.$router.replace('home')
				}).finally(() => {

				})
			})
		}).catch(reason => {
			this.$q.notify({
				type: 'negative',
				message: reason.error
			})
		}).finally(() => {
			Loading.hide()
		})
		/**/
	}
}
</script>

<style scoped>

</style>
