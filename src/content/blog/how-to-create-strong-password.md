---
title: "How to Create a Strong Password: Length, Entropy and a Free Generator"
description: "Learn what makes a password strong, how length and randomness add entropy, how a 16-character random password compares with a 12-character one, and how to store passwords safely."
tools: [password-generator]
cat: security
date: 2026-11-05
keywords: [strong password generator, how to create a strong password, password entropy, random password, password manager]
faq:
  - q: "How long should a strong password be?"
    a: "For random passwords, use at least 12 characters for ordinary accounts and 16 or more for important ones such as email, banking and password managers. Length adds strength faster than adding symbols."
  - q: "Is a password generator safe to use?"
    a: "It is safe when the password is generated locally. Our generator runs in your browser using the Web Crypto API, so the password is created on your device and is not sent to or stored by us. Still, copy it straight into a password manager."
  - q: "What is password entropy?"
    a: "Entropy measures unpredictability in bits. Each extra bit doubles the number of guesses an attacker needs. Our 74-character set gives about 6.2 bits per character, so 16 random characters give about 99 bits."
  - q: "Should I change my passwords regularly?"
    a: "Current guidance, including from NIST, advises against forced periodic changes. Change a password when you suspect it was exposed, when a service reports a breach, or when you find it reused."
  - q: "Is a passphrase better than a random password?"
    a: "A long passphrase of several random words can be strong and easier to remember, which suits a password manager's master password or a device login. For accounts stored in a manager, a long random password is fine."
---
**Quick answer:** a strong password is **long, random and unique**. Use at least 12 characters, ideally 16 or more, generated randomly rather than invented by you, and never reuse it on another site. Our free [Password Generator](/password-generator/) creates a random password of 8 to 128 characters in your browser, so nothing is sent to a server. Store the result in a password manager so that you do not have to remember it.

## Why most passwords are weak

People tend to build passwords from things they can remember: names, dates, pet names, keyboard patterns and small variations like "Summer2026!". Attackers know this. They run automated guesses that try common words, leaked passwords from past breaches and predictable substitutions such as "a" to "@". A password that feels clever to you is often near the top of a cracking list.

The second big problem is **reuse**. If you use the same password on several sites and one is breached, attackers try the leaked email and password combination on other services, a technique called credential stuffing. A strong password reused is as dangerous as a weak one.

## What actually makes a password strong

### 1. Length

Each extra character multiplies the number of possible passwords. Length gives more protection than most complexity rules, which is why modern guidance emphasises length over forcing special characters.

### 2. Randomness

A password is only as strong as its least predictable part. A truly random string has no pattern for an attacker to exploit. Humans are poor at randomness, so use a generator that draws from a cryptographically secure source.

### 3. Uniqueness

Every account gets its own password. This limits the damage from a breach to a single account.

## Measuring strength with entropy

Security experts measure strength in **bits of entropy**: each extra bit doubles the number of guesses needed. For a random password, entropy = length × log₂(number of possible characters).

Our generator draws from 74 characters: lowercase letters, uppercase letters, digits and the symbols `!@#$%^&*-_=+`. Each character carries about log₂(74) ≈ **6.21 bits**.

| Length | Approximate entropy |
|---|---|
| 8 characters | 50 bits |
| 12 characters | 75 bits |
| 16 characters | 99 bits |
| 20 characters | 124 bits |

An 8-character random password is within reach of determined offline attacks if the service stores it poorly, while 99 bits is far beyond any realistic guessing attack. Going from 12 to 16 characters adds about 25 bits, which makes the password roughly 30 million times harder to guess, and that is why 16 is a good default for important accounts.

These figures apply to **random** passwords. A 16-character password built from a phrase with predictable substitutions has far less real entropy than the table suggests.

## How our password generator works

The generator creates each character by drawing numbers from `crypto.getRandomValues`, the browser's cryptographically secure random number generator, and mapping them to the 74-character set. The length can be set from 8 to 128, and the default is 16. It runs entirely in your browser: the password is created on your device and is not transmitted to or stored by us. A new password appears each time you click **Generate password**.

Because the character set includes symbols, a few websites that restrict special characters may reject some results. If that happens, generate another one or lengthen it, since extra length makes up for a smaller character set.

## Step by step: creating and saving a strong password

1. Open the [Password Generator](/password-generator/).
2. Set a length of 16 or more for important accounts.
3. Click **Generate password** and copy the result.
4. Paste it into the website's password field and into your **password manager** at the same time.
5. Enable **two-factor authentication** (2FA) on the account if it is offered.

## Use a password manager

Nobody can remember dozens of random 16-character passwords, and that is fine. A password manager stores them in an encrypted vault and fills them in for you. You only need to remember one strong **master password** (see passphrases below). Reputable managers are built into modern browsers and phones, and standalone apps add extras such as sharing and breach alerts. Whichever you choose, protect it with a strong master password and 2FA.

## Passphrases for the passwords you must remember

A few passwords have to live in your head: your password manager, your computer login and perhaps your phone. For these, a **passphrase** of four to six random, unrelated words, such as "copper lantern drift pasta wallet", is both strong and memorable. The words must be chosen randomly, for example by dice or a generator, and not picked by you, because a phrase from a song or quote is easy to guess. Add a word if the account is especially valuable.

## Habits that matter more than complexity rules

- **Never reuse passwords** across accounts, especially for email, which can reset all your others.
- **Turn on 2FA**, preferably with an authenticator app or a hardware key rather than SMS where possible. It protects you even if the password leaks.
- **Do not share passwords** over email or chat. Use your manager's sharing feature if it has one.
- **Watch for phishing.** The strongest password does not help if you type it into a fake login page. Check the address and be wary of urgent messages.
- **Change a password only when needed:** after a breach notice, if you suspect exposure or when you find a reused one. Guidance from bodies such as NIST advises against forcing regular changes, since that leads people to choose weaker, predictable passwords.
- **Check for breaches.** Services such as Have I Been Pwned show whether an email address appears in known leaks.
- **Secure your email account first**, because whoever controls it can reset your other passwords.

## Mistakes to avoid

1. Adding a number or symbol to a dictionary word and calling it strong.
2. Using personal information such as your name, date of birth, phone number or pet.
3. Writing passwords on sticky notes near your screen or keeping them in an unprotected notes file.
4. Saving a password in a shared browser profile on a public computer.
5. Using a security question with an answer others can find online. Treat answers like extra passwords by entering random strings and storing them in your manager.

## Key takeaways

- Strong means long, random and unique.
- 16 random characters give about 99 bits of entropy; 12 give about 75.
- Our generator creates passwords in your browser using the secure random generator built into it.
- Store passwords in a manager and turn on 2FA wherever possible.
- Use a random multi-word passphrase for the few passwords you must memorise.
