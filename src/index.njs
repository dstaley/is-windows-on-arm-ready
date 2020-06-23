{% extends "layouts/base.njs" %}
{% import "macros.njs" as macros %}

{% block main %}
    <header class="container">
        <h1>Is Windows on ARM ready?</h1>
        <p>This site shows whether popular Windows applications and development platforms natively support Windows on ARM64.</p>
    </header>
    <main class="container">
        <div class="grid">
            {{ macros.section(entries.microsoft, "Microsoft", "Applications developed by Microsoft") }}
            {{ macros.section(entries.applications, "Applications", "Applications developed by third-parties") }}
            {{ macros.section(entries.development, "Development", "SDKs and other application development tools") }}
        </div>
        <div>
            <h2>Frequently Asked Questions</h2>
            <h3>Why is this important?</h3>
            <p>While Windows on ARM64 can emulate x86 applications, performance and battery consumption are greatly improved for applications that are compiled natively for ARM64. In order to support a healthy ecosystem, it's important that the most popular applications support ARM64 natively.</p>

            <h3>What applications are included?</h3>
            <p>This listing only contains the most popular applications; it doesn't attempt to be an exhaustive list. Good candidates for inclusion are applications that are widely installed, or are widely used in particular workloads. Additionally, we include the most popular development SDKs that are used to build applications on Windows.</p>

            <h3>Can I suggest an application or suggest a change?</h3>
            <p>Please do! You can file an issue on
                <a href="https://github.com/dstaley/is-windows-on-arm-ready">GitHub</a>
                or
                <a href="https://twitter.com/dstaley">send me a tweet</a>.</p>
        </div>
    </main>
    <footer>
        <p>Made with ❤️ by
            <a href="https://dstaley.com">Dylan Staley</a>, who dreams of a full ARM64 future.
        </p>
        <p>
            <a href="https://github.com/dstaley/is-windows-on-arm-ready">View on GitHub</a>
        </p>
    </footer>
{% endblock %}