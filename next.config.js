/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['localhost', 'st.kp.yandex.net', 'avatars.mds.yandex.net'],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        prependData: `@import "variables.scss";`
    }
}

module.exports = nextConfig
