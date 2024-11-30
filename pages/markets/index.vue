<template>
  <div class="container mx-auto px-4 py-16 text-center">
    <h1 class="mb-6 text-4xl font-bold tracking-tight">
      Farmers Markets
    </h1>

    <div class="mx-auto max-w-2xl">
      <Card class="p-6">
        <CardHeader>
          <CardTitle class="flex items-center justify-center gap-2">
            <Icon name="mdi:store-clock" class="h-6 w-6" />
            Coming Soon
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p class="mb-6 text-muted-foreground">
            We're working on bringing you a complete list of markets where you can find our carnivorous plants. Check
            back soon!
          </p>

          <Button variant="default" as-child>
            <NuxtLink to="/">
              <Icon name="mdi:home" class="mr-2 h-4 w-4" />
              Return Home
            </NuxtLink>
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
