<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chantier', function (Blueprint $table) {
            $table->id('id_Chantier');
            $table->string('nom_chantier');
            $table->string('localisation')->nullable();
        });

        Schema::create('affectation', function (Blueprint $table) {
            $table->id('id_affectation');
            $table->date('date_debut');
            $table->date('date_fin');
            $table->foreignId('userIdUser')->constrained('users', 'id_user')->cascadeOnDelete();
            $table->foreignId('chantierIdChantier')->constrained('chantier', 'id_Chantier')->cascadeOnDelete();
        });

        Schema::create('pointage', function (Blueprint $table) {
            $table->id('pointage');
            $table->date('date');
            $table->foreignId('userIdUser')->constrained('users', 'id_user')->cascadeOnDelete();
            $table->boolean('presense')->default(false);
        });

        Schema::create('demande_conges', function (Blueprint $table) {
            $table->id('id_demande');
            $table->foreignId('userIdUser')->constrained('users', 'id_user')->cascadeOnDelete();
            $table->date('date_debut');
            $table->date('date_fin');
            $table->boolean('validation')->default(false);
            $table->boolean('annulation')->default(false);
            $table->boolean('refuser')->default(false);
        });

        Schema::create('habilite', function (Blueprint $table) {
            $table->id('id_habilite');
            $table->foreignId('userIdUser')->constrained('users', 'id_user')->cascadeOnDelete();
            $table->string('label');
        });

        Schema::create('plan', function (Blueprint $table) {
            $table->id('id_plan');
            $table->foreignId('chantierIdChantier')->constrained('chantier', 'id_Chantier')->cascadeOnDelete();
            $table->string('label');
        });

        Schema::create('autorisation', function (Blueprint $table) {
            $table->id('id_autorisation');
            $table->string('chantier');
            $table->string('label');
        });

        Schema::create('notification', function (Blueprint $table) {
            $table->id('id_notification');
            $table->date('date');
            $table->text('message');
            $table->string('chantier');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notification');
        Schema::dropIfExists('autorisation');
        Schema::dropIfExists('plan');
        Schema::dropIfExists('habilite');
        Schema::dropIfExists('demande_conges');
        Schema::dropIfExists('pointage');
        Schema::dropIfExists('affectation');
        Schema::dropIfExists('chantier');
    }
};
