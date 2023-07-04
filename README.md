# Sportsgenph

![Sportsgen](https://sportsgenph.sgp1.cdn.digitaloceanspaces.com/assets/sportsgenph_main.png)

Sportsgenph is WEB application developed using the powerful Next.js framework. It's deployed on DigitalOcean's cloud platform and uses MongoDB as its NoSQL database solution, providing users with a seamless, fast, and reliable experience.

## Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Usage](#usage)

## Features

- Real-time sports event posting
- Responsive, user-friendly UI
- High-speed data retrieval
- Reliable data storage and management with MongoDB

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js 16.16.0
- MongoDB 4.4 or later
- A DigitalOcean account (if you wish to deploy)

## Installation

To install Sportsgenph, follow these steps:

1. Clone the repo:
    ```
    git clone https://github.com/dynazero/sportsgen_dev.git
    ```
2. Navigate to the project directory:
    ```
    cd sportsgenph_dev
    ```

3. This project uses Yarn for package management. If you do not have Yarn installed, you can install it globally with npm:
    ```
    npm install -g yarn
    ```

4. Install the project dependencies with Yarn:
    ```
    yarn install
    ```

5. Copy the example environment file and configure it according to your environment:
    ```
    cp .example.env
    ```

## Usage

To run Sportsgenph in a development environment, use the following command:

```bash
yarn dev
