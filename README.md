# Hashing

## Learning Objectives

- Use a vetted library to hash sensitive data

## Introduction

It's a pretty big security risk to store human readable passwords in databases. Even in very secure systems, there's always a chance that somebody could break in and steal your data - we need to be prepared for that. So how do we hide things like passwords if we still need to store them so users can actually log in to our app?

We hash them!

> Hashing is a one-way system that transforms any piece of data into gibberish. There is no way to transform the data back into its original state, making it a highly effective solution for storing and verifying sensitive information such as passwords.

Hashing is:

- ***Deterministic***: The same input will *always* produce the same output.
- ***One-way***: It's practically impossible to reverse a hash back to its original data form.

Since hashing is both deterministic and one-way, it's a great solution for storing passwords in a database. Even if somebody gains access to the data, they won't be able to un-hash the password to see what it was - but we can still verify a user has entered their password correctly because we can hash what they enter and compare the hash to the one stored in the database.

Let's imagine a user creates an account and enters the password "`mypassword`". We don't want anybody, even the developers, to know what their password is so we hash it and store the hash in the database instead. The SHA256 hash of `mypassword` is and always will be `89e01536ac207279409d4de1e5253e01f4a1769e696db0d6062ca9b8f56767c8`, that's what we store.

Later, the user tries to log in using that password, "`mypassword`". We use the same hashing algorithm to hash what they enter and then compare the resulting hash to the one stored in the database when they created their account.

The password they entered was the same, we used the same hashing algorithm to hash them, so the resulting hash is exactly the same! That's how we hide passwords from prying eyes while maintaining our ability to verify login credentials.

Even if somebody broke into our database and saw the hash, there's no way they'd be able to reverse it back into `mypassword` since it's a one-way system.

<details>
<summary><strong><em>What if two users have the same password?</em></strong></summary>
<br>
If more than one user has the same password, we'll see the same hash in the database for both of them. This can be a security risk too! There's a solution to this: <em>salting</em>.
<br><br>
The idea of a salt is to add some extra randomness to the resulting hash to make sure that, even when two users have the same password, their hashes are completely different. We do this by adding some random characters to the beginning or end of the password before hashing it - <code>mypassword</code> might become <code>Jhds93nmypassword</code> before it gets hashed. There, <code>Jhds93n</code> is the <em>salt</em>.
<br><br>
The SHA256 hash of <code>Jhds93nmypassword</code> is, and always will be, <code>CB6A4A4B5595111BE4DFE0754A0F98D4E0463041CD1E4F6EF5752E67A202C30B</code>.
<br><br>
If another user decides to use <code>mypassword</code>, they would be given a different <em>salt</em>. For example, <code>8kf73Mfamypassword</code> which will result in a SHA256 hash of <code>7B36DB719FEB0CF138860BB930B888A3DECE76390BF4F317FDDB6C54F350205C</code>.
<br><br>
Two different users using the same password, but their hashes are completely different! You can save the salt in your database to use later when the user tries to log in, its purpose is only to ensure completely unique hashes.
</details>

## Setting up

1. Fork this repository and clone the fork.
2. Rename `.env.example` to `.env`
3. Create a new database instance in ElephantSQL, then edit the `DATABASE_URL` variable in `.env`, swapping `YOUR_DATABASE_URL` for the URL of the database you just created. Leave `?schema=prisma` at the end.
4. Edit the `SHADOW_DATABASE_URL` variable in `.env`, swapping `YOUR_SHADOW_DATABASE_URL` for the URL of the shadow database you created in the earlier exercises. Leave `?schema=shadow` at the end.
5. Add your JWT secret string
5. Run `npm ci` to install dependencies.
6. Run `npx prisma migrate dev` to execute the database migrations. Or `npx prisma migrate reset` to reset database and run all migrations - press `y` when it asks if you're sure.

## Instructionsnpm run

In this exercise, you'll be [using the bcrypt package](https://www.npmjs.com/package/bcrypt) to hash a user's password upon account registration and then compare it during login.

You can choose to implement the full solution yourself or complete a partially built solution. It's recommended to attempt building the solution yourself first.

<details>
<summary><strong>I want to implement the solution by myself</strong></summary>
<ul>
<li>Checkout the <code>freedom</code> branch ( <code>git checkout freedom</code> )</li>
<li>Run the app with <code>npm start</code>.</li>
<li>Work through each file in the <code>requirements</code> directory in numerical order.</li>
</ul>
</details>

<details>
<summary><strong>I want some scaffolding to help</strong></summary>
<ul>
<li>Run the app with <code>npm start</code>.</li>
<li>Work through each file in the <code>requirements</code> directory in numerical order.</li>
</ul>
</details>
